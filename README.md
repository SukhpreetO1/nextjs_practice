This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



<!-- ------------------------------------------------------------------------------------------------------------------------------------- -->
To create a next js, run this command 
    npx create-next-app@latest

To change the port number, just the following script in the package.json file 
    "scripts": {
    "start": "[ -e .env ] && set -a && . ./.env; next start",
    },

To run the project, run this command 
    npm run dev <!-- locally -->
    npm run build <!-- to make the build -->
    npm start  <!-- to deploy it online -->

To connect the next js with firebase  : 
    npm install firebase

    to check the firebase version
        firebase --version
    If you have the Firebase CLI installed, but it's not v12.5.4 or higher, update it
        npm update -g firebase-tools
    If you don't have the Firebase CLI installed, install it:
        npm install -g firebase-tools

To read the env file, fotenv package is used 
    npm install dotenv

To add the notification, 
    npm install --save react-toastify

To use the font awesome,
    npm i --save @fortawesome/fontawesome-svg-core
    npm i --save @fortawesome/free-regular-svg-icons
    npm i --save @fortawesome/react-fontawesome
    npm i --save @fortawesome/react-fontawesome@latest
    npm install --save @fortawesome/free-solid-svg-icons

To store data in cookies
    npm install js-cookie

To do password hashing
    npm install bcryptjs

In order to stop calling routes 2 times when add "use client", then change the nextConfig in the next.config.mjs file
    const nextConfig = {
        reactStrictMode: false
    };


    npm install jsonwebtoken

    npm install express multer

    npm install nodemailer

    npm install react-password-checklist --save