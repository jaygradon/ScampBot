# ScampBot

ScampBot is a chatbot for Discord.  It doesn't do much right now.

## Setup

### Recommended IDE & Plugins

 - **VSCode** - [download](https://code.visualstudio.com/download)
   - Lightweight IDE for multiple languages

 - Plugins:
   - *ESLint* - Linter to keep your codebase of quality
   - *EditorConfig for VSCode* - Ensure consistent code styling

### Project

 1. Fork the ScampBot repository
 2. Run `npm install` in the repository directory with node installed
 4. Go to https://discordapp.com/developers/applications/me/
 5. Login and click `New App` under `My Apps`
 6. Click `Create Bot User`
 7. Go to `https://discordapp.com/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0`, with your bots IDE
 8. Add your bot to your servers
 9. Set the `token` in config to your bot's token
 10. Run `npm start` and go to your Discord server to chat with your bot!
