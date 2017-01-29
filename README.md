# ScampBot

ScampBot is a chatbot for Discord.  It doesn't do much right now.

## Integrations

 - Complete
   - Err...  
 - Partial
   - Giphy
 - Planned
   - Reddit
   - Pandora
   - Github
   
## Setup

### Recommended IDE & Plugins

 - **VSCode** - [download](https://code.visualstudio.com/download)
   - Lightweight IDE for multiple languages

 - Plugins:
   - *ESLint* - Linter to keep your codebase of quality
   - *EditorConfig for VSCode* - Ensure consistent code styling

### Making your ScampBot

 1. Fork the ScampBot repository
 2. Run `npm install` in the repository directory with node installed
 3. Go to https://discordapp.com/developers/applications/me/
 4. Login and create a `New App` under `My Apps`, then `Create Bot User`
 5. Go to `https://discordapp.com/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0`, with your bot's client ID
 6. Add your bot to your servers
 7. Set the `token` in `config` to your bot's token
 8. Run `npm start` and go to your Discord server to chat with your bot!
