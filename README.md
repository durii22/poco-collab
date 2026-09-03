# POCO Create & Connect

Create a mobile-first, fully clickable prototype based on the existing POCO product:



https://poco-spark.web.app



IMPORTANT:

Do not redesign the existing product from scratch. Preserve its current dark exhibition aesthetic, typography hierarchy, blue accent color, generous spacing, card style, POCO header, KO/EN toggle, and overall visual identity.



This is a product-flow prototype only.



Do not build:



A real backend

Real file storage

Real AI processing

Real authentication

Payments

Automatic artist matching

Production-ready database logic



Use realistic placeholder artwork, album covers, profiles, audio tracks, comments, and credits. File-upload areas should be clickable mock interfaces. Every major button must navigate to the appropriate next screen. Avoid dead-end buttons.



Product objective



POCO helps independent visual artists and musicians turn their work into online exhibitions and digital albums, connect through artistic collaboration, share the result with their audiences, receive fan engagement, and generate future collaboration or commission opportunities.



Core concept:



Create → Exhibit → Promote → Gather → Engage → Earn



This prototype should focus only on:



Create → Exhibit → Share → Engage → Collaborate



1. Preserve the current landing page



Keep the existing POCO landing-page layout and visual style.



Current structure to preserve:



POCO logo

KO / EN language toggle

Sign-in icon

Dark exhibition-style interface

Main creator CTA

Visitor entrance

Three explanation sections

Final “Get started free” CTA



Update the main message slightly so the product can include both visual art and music:



“Your photos, artwork, music, and creative projects, opened as an online experience.”



Keep “Curate my work” as the primary CTA.



When the user clicks “Curate my work,” open a new project-type selection screen.



2. Project-type selection



Title:



“What would you like to create?”



Display two large cards:



Online Exhibition



For photographers, painters, illustrators, designers, and visual storytellers.



Button:

“Create an exhibition”



Digital Album



For musicians, vocalists, performers, composers, and instrumentalists.



Button:

“Create a digital album”



Do not permanently classify the user’s account as only one artist type. This selection applies only to the current project.



3. Visual artist flow



Preserve the existing POCO visual-artist creation flow.



Flow:



About you

Artist profile and biography

Upload artwork

POCO analyzes and curates

AI-generated exhibition preview

Refine the exhibition by chat

Final preview

Sign in

Confirm and publish

Published online exhibition



IMPORTANT:

The sign-in step must appear only immediately before final confirmation and publication. Do not require login at the beginning.



Visual upload prototype



Include clickable mock options:



File upload

Google Drive

Manual entry



Artwork upload cards should contain:



Image placeholder

Artwork title

Year

Medium

Short description

Artist credit



Visual exhibition result



Keep the existing POCO exhibition layout and archive structure.



Only add:



A compact music player

Track title

Musician name and credit

Link to the musician’s digital album

Like or cheer button

Comment section

Share button

Collaboration inquiry button



Do not convert the visual artist’s page into an album page. It remains an online visual exhibition with a music player added.



4. Musician flow



Use the same overall POCO structure, but adapt the input fields for musicians.



Flow:



About you

Musician profile and biography

Enter album information

Upload album cover

Upload audio tracks or performance videos

Add track information and credits

Connect visual artwork

POCO curates the digital album

Digital-album preview

Refine by chat

Final preview

Sign in

Confirm and publish

Published digital album



IMPORTANT:

The sign-in step must appear only immediately before final confirmation and publication.



Album information



Include:



Album title

Short album introduction

Musician or group name

Release type

Genre

Mood

Album cover upload

Overall credits



Track upload prototype



Provide clickable mock upload paths:



Upload MP3 or M4A

Add YouTube performance link

Add another track



Each track card should contain:



Track number

Track title

Audio player

Optional performance video

Track story or program note

Composer

Lyricist

Performer or vocalist

Visual artwork credit



Visual collaboration selection



Ask:



“How would you like to add visual artwork?”



Options:



Upload my own image

Use a collaborating visual artist’s work

Invite a visual artist

Decide later



These are prototype interactions only. Selecting an option should change the mock state and allow the flow to continue.



5. Published digital-album page



Create a premium editorial album experience in the existing POCO visual style.



Include:



Large album cover

Album title and musician profile

Album introduction

Track list

Working mock audio player with play, pause, progress, previous and next controls

Performance-video section

Track stories

Visual artworks placed between tracks

Full music and visual-art credits

Link to the collaborating visual artist’s exhibition

Like or cheer button

Comments

Share button

Performance inquiry

Collaboration inquiry



The audio player can use mock audio state. It does not need to stream or store a real audio file.



6. Shared collaboration page



Create one shared page connecting the musician and the visual artist.



Include:



Collaboration title and hero visual

Musician profile

Visual artist profile

Short story explaining the collaboration

“View the exhibition” button

“Listen to the digital album” button

Artwork and music preview

Complete credits

Fan likes, comments, and cheers

Share collaboration button

Collaboration inquiry button

“Join the next POCO collaboration” CTA



Each artist should retain their individual page. The shared page acts as the central destination for the collaboration.



7. Fan and community interactions



Create frontend-only prototype interactions for:



Like

Cheer

Comment

Share

Follow artist

Collaboration inquiry

Join the next pilot



Likes and cheers should update visually.



Submitting a mock comment should immediately display it in the comment list.



Inquiry and participation buttons should open simple modal forms and show a success message when submitted. Do not save or transmit real data.



Do not add fan artwork uploads yet.



8. AI-curation prototype



Do not implement real AI.



Simulate the experience with:



Short analysis animation

“Reading color, mood, rhythm, and relationships”

Progress indicator

Automatically generated mock exhibition or album

Three chat refinement suggestions



Suggested chat actions:



“Make the mood warmer”

“Change the viewing order”

“Emphasize the music”

“Use a more minimal layout”



Selecting one should visibly alter a small part of the preview.



9. Prototype navigation requirements



Make the complete flows clickable:



Visual artist



Landing → Project type → About you → Artwork upload → AI curation → Refine → Preview → Sign in → Confirm → Published exhibition



Musician



Landing → Project type → About you → Album setup → Track upload → Visual collaboration → AI curation → Refine → Preview → Sign in → Confirm → Published album



Visitor



Landing → Visitor entrance → Collaboration page → Exhibition or album → Comment, cheer, share, or inquiry



Provide:



Back navigation

Progress indicator

Save-draft mock state

Mobile and desktop responsive layouts

Working KO/EN toggle for principal interface text

No broken buttons or dead ends



10. Final prototype requirement



Build the entire prototype using placeholder content and make it suitable for showing to musicians, visual artists, cultural organizations, team members, and early investors.



The primary purpose is to demonstrate:



How a visual artist creates an exhibition

How a musician creates a digital album

How both artists connect through one collaboration

How each artist shares the result with their own audience

How fans engage

How another artist discovers POCO and applies to participate



After completing the prototype, ensure it can be published as a publicly shareable Lovable preview link.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c7e6c1a6-c99a-4edc-960b-c66526237b88).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
