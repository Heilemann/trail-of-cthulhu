# Getting Started

First create a .env file in the root of the project with the following contents:

`NODE_ENV=development`

This will enable the developemnt toolbar to show up when you're running the localhost server. Then run the following commands:

`npm install`
`npm start`

## To Develop

During development use the localhost server to test your immediate changes. It attempts to create a way to quickly iterate through ideas without having to go to the platform to test them.

It is however a very imperfect preview, and it's best to test your changes on the platform. To get the project built and running on the platform, make sure your project is checked into git and run the following command, and when it's done import the system into the platform.

`npm run build && gulp && git add . && git commit -m "Updating" && git push`

This is just one way to do it, but it's the way I've been doing it, imperfect as it is.
