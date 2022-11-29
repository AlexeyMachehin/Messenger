export const profileTemplate =`
#{goBackAside}
.card
    .container #[h1 My profile] #[img.avatar(src=avatarURL alt="avatar")] #[h3=displayName] !{generalInputEmail} !{generalInputLogin} !{generalInputName} !{generalInputSurname} !{generalInputNickname} !{generalInputPhoneNumber} !{generalLinkChangeData} !{generalLinkChangePassword} !{logout}
`
