import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    userPublicKey:defineTable({
        publicKey:v.string(),
        user:v.id('users')
    }),
    groupchats:defineTable({
        userId:v.id('users'),
        groupId:v.id('groups')
    }),
    messages:defineTable({
        from:v.id('users'),
        content:v.string(),
        groupId:v.id('groups')
    }),
    verification:defineTable({
        email:v.string(),
        type:v.union(v.literal('signIn'), v.literal('signUp')),
        code:v.string()
    }),
    sessions:defineTable({
        deviceId:v.string(),
        authSessionId:v.id('authSessions')
    }),
    groups:defineTable({
        name:v.string(),
        description:v.string(),
        isDm:v.boolean(),
        owner:v.id('users'),
    }) 
})
export default schema;

// import { defineEnt, defineEntSchema, getEntDefinitions } from "convex-ents";
// import { v } from "convex/values";

// const schema = defineEntSchema({
//     users:defineEnt({
//         publicKey:v.string(),
//         password:v.string(),
//     }).field('email', v.string(), {unique:true}).edge('session').edges('group', {to:'groups', table:"groupchat"}).edge('profile'),

//     profiles:defineEnt({
//         name:v.string(),
//         description: v.string(),
//     }).edge('user'),
//     messages:defineEnt({
//         from:v.id('users'),
//         content:v.string()
//     }).edge('group'),

//     sessions:defineEnt({
//         deviceId:v.string(),
//     }).edge('user'),

//     groups: defineEnt({
//         name:v.string(),
//         description:v.string(),
//         isDm:v.boolean(),
//         owner:v.optional(v.id('users'))
//     }).edge('message').edges('user', {to:'users', table:"groupchat"})
// })

// export default schema;

// export const entDefinitions = getEntDefinitions(schema); 

