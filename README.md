# Bloom Chats 

*Bloom Chats* is a secure and feature-rich messaging app built with React Native for cross-platform functionality. Designed to prioritize user privacy and security, Bloom Chats offers encrypted messaging, group chat management, bill-splitting capabilities, media sharing, and customizable chat templates.

NOTE: For web testing use this expo version of this project, visit https://github.com/anshuman-rai-27/expoway

## Key Features

### 1. *End-to-End Encryption*
   - *Private Direct Messages (DMs):* All direct messages are encrypted using *TweetNaCl* for asymmetric encryption, ensuring secure, private communication between users.
   - *Media Sharing Encryption:* Photos shared within chats are encrypted, providing additional protection for media content.

### 2. *Group Chats*
   - *Group Formation:* Users can easily create and manage group chats.
   - *Custom Group Bot:* Automate group moderation with custom commands (e.g., /info to share group information with new users).
   - *Disappearing Messages:* Option for self-destructing messages in both direct messages and groups.

### 3. *Bill Splitting*
   - *Group Bill Splitting:* Users can split bills in group chats, automatically sending amounts to selected users, making shared expenses easier to manage.

### 4. *Customizable Message Templates*
   - Personalize chat experiences with custom message templates, which adapt to user preferences for more efficient communication.

### 5. *Photo Sharing*
   - *Encrypted Photo Sharing:* Users can share photos securely, thanks to robust encryption to protect the content from unauthorized access.

### 6. *Audio & Video Calls*
   - *ZUGO Cloud Integration:* Secure audio and video calls are supported, utilizing *ZUGO Cloud’s* highly encrypted services to maintain privacy in real-time communication.

### 7. *Multiple Sessions*
   - Users can log in to the same account across multiple devices, maintaining synchronization and security for all active sessions.

### 8. *Multiple Authentication Systems*
   - Offers multiple authentication methods (e.g., password, biometric login) for secure access to user accounts.

### 9. *Message Time Stamping*
   - Each message is timestamped, allowing users to keep track of when messages were sent and received.

## Tech Stack

- *React Native:* Cross-platform app development for both iOS and Android.
- *TweetNaCl:* Asymmetric encryption for securing direct messages and photos.
- *Convex:* Backend service for real-time communication and data storage.
- *ZUGO Cloud:* Encrypted audio and video calling services.
- *Socket.IO:* Real-time messaging support.

## Installation

To set up *Bloom Chats*, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Edantuti/bloomchats.git
   ```
Install dependencies:

bash
Copy code
cd bloomchats
npm install
Run the app:

bash
Copy code
npm start
Follow platform-specific instructions to build for iOS or Android.

Usage
After installation, you can use Bloom Chats to:

Send secure, encrypted direct messages.
Create and manage group chats.
Split bills within group chats.
Share encrypted photos with ease.
Conduct secure audio and video calls.
Use custom message templates to streamline communication.
Technologies Used
React Native: For building cross-platform applications.
TweetNaCl: Asymmetric encryption to ensure the privacy of messages and shared media.
Convex: Backend service for handling real-time data and chat functionalities.
ZUGO Cloud: High-quality, encrypted voice and video calling.
Socket.IO: Real-time communication protocol for messaging and chat group formation.

<img src="./WhatsApp Image 2024-10-19 at 21.02.29.jpeg"/>
