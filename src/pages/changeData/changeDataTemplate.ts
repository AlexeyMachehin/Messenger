export const changeDataTemplate = `
div !{uploadAvatarModal}
div !{goBackAside}
    .card
        .container #[h1 Change profile data] !{avatar}
            // .avatar-wrapper(id="open") 
            //     img(class="avatar" src=avatarURL alt="avatar") 
            h3=displayName  
            .container !{generalInputEmail} !{generalInputLogin} !{generalInputName} !{generalInputSurname} !{generalInputNickname} !{generalInputPhoneNumber} !{generalButtonSave}
`
