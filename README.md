<<<<<<< HEAD
# Documentation
=======
# V2 - The Timeless Tutor
This repo consists of version 2.0 of [The Timeless Tutor](https://github.com/p2pV1/v1) frontend application built on [Vite](https://vitejs.dev/) (React).

### How to get started?
Clone the repository & change working directory into `v2-frontend`.
```bash
git clone https://github.com/The-Timeless-Tutor/v2-frontend.git && cd v2-frontend
```

**Note**: For the first time project installation run. else simply run `npm/yarn/bun run dev` as per your package manager.

**For Linux, Unix OS**
```bash
npm run init-unix
```

**For Windows**
```bash
npm run init-windows
```

### Project Structure
Every new file or folder must reside into `src` folder except config and environment files. e.g. `tailwind.config.js`, `.env`.
**Note**: Strictly follow the project structure, no overrules appreciated.
```
src
    - assets: Includes all the static files, media.

    - components: Includes all the global react-components that needs to be rendered into different pages, components.
        -- [folder]: Note: In case the component requires custom styling, child components.
        // @dev Example
        -- Authentication => folder
            --- Web3ConnectButton.jsx
            --- styles
            --- components
        -- RoomCard.jsx => component

    - contexts: Includes all the context api configuration components.
        // @dev Same goes here, if you need to block components then you can use folders.

    - mocks: Includes the mock response from server. Mostly used for arrays data from response.
        // @dev Example
        -- RecommendedRooms.json => file
        [
            {
                _id: ObjectId,
                roomName: string,
                ...
            },...
        ]

    - pages
        // @dev Same goes here, if you need to block components then you can use folders.
        // @dev no more foldering than local level components folder
        -- Dashboard => folder
            --- index.jsx => file
            --- styles => folder
            --- components => folder: Local level components for ./index.jsx
                --- ...jsx => components
        -- Login.jsx => component
    
    - utils: Consists of package configuration
        -- firebase.js
        -- Routers.jsx

    - App.jsx: Maybe used, may not be used.

    - index.css: only global css are defined here

    - main.jsx: Entry point for v2-frontend
```

### Discussion
All the frontend related discussions, queries, references can be shared [here](https://github.com/The-Timeless-Tutor/v2-frontend/discussions). It includes [📣 announcements](https://github.com/The-Timeless-Tutor/v2-frontend/discussions/categories/announcements), [💬 general queries](https://github.com/The-Timeless-Tutor/v2-frontend/discussions/categories/general), [💡 ideas](https://github.com/The-Timeless-Tutor/v2-frontend/discussions/categories/ideas), [🗳️ polls](https://github.com/The-Timeless-Tutor/v2-frontend/discussions/categories/polls), [🙏 qa](https://github.com/The-Timeless-Tutor/v2-frontend/discussions/categories/q-a), and [🙌 describe new research](https://github.com/The-Timeless-Tutor/v2-frontend/discussions/categories/show-and-tell).

Play around, share resources, if any confusions then discussions is here. Happy Hacking!

### Kanban
All the Todo, In Progress, Backlog, and Completed tasks should be listed on [The Timeless Tutor Kanban](https://github.com/orgs/The-Timeless-Tutor/projects/1).
*Backlogs are the completed tasks that later becomes an issue.*

`Note: Kanban is an Agile management method built on a philosophy of continuous improvement, where work items are “pulled” from a product backlog into a steady flow of work.`

### Pull Request Format
The format for the pull request is [here](https://github.com/The-Timeless-Tutor/v2-frontend/pull/2). 
- Every frontend dev must at least give a review to the [changed file](https://github.com/The-Timeless-Tutor/v2-frontend/pull/2/files) and add comments if any suggestions. 
- Dev that created the pull request must be descriptive about the pull request and add reviewers manually and tag label.
- Make sure to list it on the projects([kanban](https://github.com/orgs/The-Timeless-Tutor/projects/1)) since it reflects the direct contribution and will be easier if the production has to do deployment rollbacks.
- Naturally you won't be able to merge the code into main branch, but if you can please don't merge. [@13x54r](https://github.com/13x54n) will be assigned for the merge task.
- Every pull request title must summarize the context. e.g. `feature: web3 authentication completed.`, `bug: minor package version bump fixed`
- Then close the related issue ticket from issues.

`Note: Every review can add code snippets for the suggestions, review using Markdown.`

### Issue Format
Unlike pull request you won't be able to include the whole directory to review but specific bug or feature request can be requested with file links. If you want someone specific to solve the issue you can mention them using `@`. 

e.g. `feature: active call badge is not working on room card.`, `bug: authentication token invalid.` 

**Note**: Title must be summarized and descriptive. You can yap all the comments on description with code snippets, images, mention someone, insert reference links, etc. The limit is limited to you. 🔭 Explore, fail, backlog it, figure it out and tag it done. Happy Hacking!


&copy; The Timeless Tutor, 2024. All Rights Reserved.
>>>>>>> ba555afb4c3e1961440df3c2ec4a2121ec2dc414
