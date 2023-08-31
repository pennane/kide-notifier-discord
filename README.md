# kide-notifier-discord

The kide-notifier-discord is a bot designed to monitor Kide.App products (events, products or memberships) and notify Discord servers about them. The bot posts notifications about new products, product updates and reminders for upcoming sales. The bot targets text channels named `kide-helper` in every Discord server it's present in.

## Features

**New Event Alerts**: Whenever a new Kide.App product is added matching specified filters (by default events in the Metropolitan area), the bot will post a notification about it.

**Updated Event Alerts**: If any known event has been updated, the bot will notify you about the changes.

**Upcoming Event Reminders**: The bot schedules reminders to alert you about events that are coming to sale soon.

## Installation

```sh
pnpm install
pnpm build
pnpm start
```

### Requirements

- Node.js
- A Discord Bot Token
- Discord Developer Account

### Environment Variables

Create a .env file in the root of your project and add the following environment variables:

```sh
DISCORD_TOKEN=
DISCORD_CLIENT_ID=
DISCORD_DEVELOPER_USER_ID=
DISCORD_TEST_CHANNEL_ID=
```

Fill in the respective values. Additional information can be found in the `config/env.ts` file.

## Usage

**Invite the Bot**: Use the bot's invite link to add it to your Discord server.

**Create a Channel**: Make sure you have a text channel named "kide-helper" in your server where the bot can post notifications. (the channel name can be overridden with an env variable)

**Receive Notifications**: After setting up, you'll automatically start receiving event notifications in the "kide-helper" channel.
