# Getting Started

First create a .env file in the root of the project with the following contents:

`NODE_ENV=development`

This will enable the development toolbar to show up when you're running the localhost server. Then run the following commands:

`npm install`
`npm start`

The server runs at `http://localhost:3004/`. During development use the localhost server to test your immediate changes like layout. It attempts to create a way to quickly iterate through ideas without having to go to the platform to test them.

It is however a very imperfect preview, and it's best to test your changes on the platform. To get the project built and running on the platform, make sure your project is checked into git and run the following command, and when it's done import the system into the platform.

`npm run build && gulp && git add . && git commit -m "Updating" && git push`

# Other Ways to Create Systems

There are probably other ways to create and package systems, but this is the way I've found to fit the bill. If you have any suggestions, please let me know. For now it might be best to just copy this project and start from there. But for those adventurous enough, let me explain how and why this works the way that it does.

The first thing to understand is that all runtime code in a system is served in a sandboxed iframe. One of the key tenants of our systems implementation is that the system should not be able to affect the platform in any way. This is why the system is served in an iframe. The iframe is also sandboxed, which means that the system cannot access the parent window, and the parent window cannot access the system window. This is a security feature of iframes that prevents cross site scripting attacks.

Because of this there are two main constraints to be aware of. Firstly all communication with the platform happens through post messages. This is the API for the platform, and through it data can be safely passed back and forth.

Secondly, the system itself is only run inside of the iframe, never within the platform. There it is in fact only transported and stored as a string. This is key, because while the reference implementation you have here is written in React, it could just as easily be written in Angular, Vue, or even vanilla javascript. The platform doesn't care, it just needs to be able to store the system as a string, and then serve it up in an iframe.

## Drag and Drop Events

It's also worth noting that certain kinds of event handling may be slightly wonky, again this is as a result of the sandboxing, which doesn't allow e.g. a drag event started within the parent frame to be handled by the system frame. There is a system in place which attempts to bridge these events, but it's not perfect. If you run into any issues, please let me know.

You can see an example of a drop target at work in `Weapons.tsx` which accepts documents of the type `weapon`.
