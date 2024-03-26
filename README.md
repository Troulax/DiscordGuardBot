# DiscordGuardBot

DiscordGuardBot is a Discord bot developed using Discord.js, designed to protect Discord servers from harmful raids and spam attacks.

## Features

- **reboot**: Allows you to restart the bot.

### Automatic Protection (Available only for users with administrative permissions):

- **Role Protection**: If any role is deleted, the bot takes away all permissions from the user who deleted the role, recreates the role, and restores the role to the members who had it before deletion. You'll receive a notification about this action.

- **Ban Protection**: When someone bans or kicks a member from the server, the bot takes away all permissions from the user who performed the action. If a ban is issued, the bot will unban the member.

- **Mention Spam Protection**: If a user mentions another user excessively within a certain period, the user will be temporarily muted and their mentions will be cleared. You'll receive a notification about this action.

- **Channel Protection**: If any channel is deleted, the bot takes away all permissions from the user who deleted the channel, recreates the channel with the same permissions, and notifies you about this action.

## Usage

To use DiscordGuardBot in your Discord server, follow these steps:

1. Invite DiscordGuardBot to your Discord server using the provided invite link.
2. Set up necessary permissions for DiscordGuardBot to perform actions like managing roles, banning members, and managing channels.
3. Use the available commands prefixed with a designated prefix (default prefix: '!') to interact with DiscordGuardBot.
4. If you have administrative permissions, DiscordGuardBot will automatically protect your server from certain harmful actions, such as role deletions, bans, mention spam, and channel deletions.

## Installation

To host DiscordGuardBot yourself or contribute to the project, follow these steps:

1. Clone the repository to your local machine.
2. Install Node.js and npm if you haven't already.
3. Navigate to the project directory in your terminal.
4. Install the required dependencies by running `npm install`.
5. Update the configuration file with your Discord bot token and other configurations (if any).
6. Start the bot by running `node bot.js` or `npm start`.

