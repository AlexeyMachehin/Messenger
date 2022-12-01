export const changeDataTemplate = `
div !{goBackAside}
    .card
        .container #[h1 Change profile data] 
            label.avatar-label !{avatar} !{fileInput}
            h3=displayName  
            form(class="container change-data-form") !{generalInputEmail} !{generalInputLogin} !{generalInputName} !{generalInputSurname} !{generalInputNickname} !{generalInputPhoneNumber} !{generalButtonSave}
`
