export const changeDataTemplate = `
div !{uploadAvatarModal}
div !{goBackAside}
    .card
        .container #[h1 Change profile data] !{avatar}
            h3=displayName  
            form(class="container change-data-form") !{generalInputEmail} !{generalInputLogin} !{generalInputName} !{generalInputSurname} !{generalInputNickname} !{generalInputPhoneNumber} !{generalButtonSave}
`
