export const changePasswordTemplate = `
div !{goBackAside}
    .card
        .container #[h1 Change password] #[img(class="avatar" src=avatarURL alt="avatar")] 
            form.container !{generalInputOldPassword} !{generalInputNewPassword} !{generalButtonSave}
`
