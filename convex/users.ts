import { v } from "convex/values"
import { action, mutation, query, internalAction } from "./_generated/server"
import { api, internal } from "./_generated/api";


export const getUser = query({
    args:{email:v.string()},
    handler:async (ctx, args)=>{
        return await ctx.db.query('users').filter((q)=>q.eq(q.field('email'), args.email)).first();
    }
})

export const getUserByUserId = query({
    args:{userId:v.id('users')},
    handler:async(ctx,args)=>{
        return await ctx.db.get(args.userId);
    }
})


export const createVerificationCode = mutation({
    args:{email:v.string(), code:v.string(),type:v.union(v.literal("signIn"), v.literal('signUp'))},
    handler:async (ctx,args)=>{
        await ctx.db.insert('verification',{
            email:args.email,
            code: args.code,
            type:args.type
        })
    }
})

export const sendEmail = action({
    args:{email:v.string(), type:v.union(v.literal("signIn"), v.literal('signUp'))},
    handler:async (ctx,args)=>{
        const code = Math.floor(100000 + Math.random() * 900000);
        
        await ctx.runMutation(api.users.createVerificationCode,{email:args.email, code:code.toString(), type:args.type})

        console.log(process.env.RESEND_API, 'Env')
        try{
        const response = await fetch(`https://api.resend.com/emails`,{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${process.env.RESEND_API}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                from:process.env.RESEND_EMAIL,
                to:args.email,
                subject: `Verification Code for ${args.type[0].toUpperCase()}${args.type.substring(1)}`,
                text:`Code:${code.toString()}`
            })
        })
        console.log(response)
        }catch(error){
            console.error(error)
        }
    }
})

export const checkVerificationCode = mutation({
    args:{email:v.string(), code:v.string(), type:v.union(v.literal("signIn"), v.literal('signUp'))},
    handler:async (ctx,args) =>{
        const codeDetail = await ctx.db.query('verification').filter((q)=>q.eq(q.field('email'), args.email)).order('desc').first();
        if(!codeDetail){
            console.log("Doesn't exist")
            return;
        }
        if(args.code.localeCompare(codeDetail.code)!==0){
            console.log("Mismatch")
            return;
        }
        await ctx.db.delete(codeDetail._id);
        return {message:"Success"};
    }
})



export const setPublicKey = mutation({
    args:{email:v.string(), publicKey:v.string()},
    handler:async(ctx,args)=>{
        const userInfo = await ctx.db.query('users').filter((q)=>q.eq(q.field('email'), args.email)).first();
        await ctx.db.insert('userPublicKey',{
            publicKey:args.publicKey,
            user:userInfo!._id
        })
        return args.publicKey
    }
})

export const getPublicKey = mutation({
    args:{email:v.string()},
    handler:async(ctx,args)=>{
        const userInfo = await ctx.db.query('users').filter((q)=>q.eq(q.field('email'), args.email)).first();
        const publicKey = await ctx.db.query('userPublicKey').filter((q)=>q.eq(q.field('user'), userInfo!._id)).first();
        return publicKey!.publicKey
    }
})
