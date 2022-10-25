export function avatarTemplate(props: { avatarURL: string }) {
  return `
.avatar-container
    img.avatar-container_avatar(src=${props.avatarURL} alt="avatar")
`;
}
