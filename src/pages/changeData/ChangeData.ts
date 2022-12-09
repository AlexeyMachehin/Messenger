import { Block } from '../../utils/Block';
import { changeDataTemplate } from './changeDataTemplate';
import { router } from '../../index';
import { Avatar } from '../../components/avatar/Avatar';
import { GeneralButton } from '../../components/generalButton/GeneralButton';
import { GeneralInput } from '../../components/generalInput/GeneralInput';
import { GoBackAside } from '../../components/goBackAside/GoBackAside';
import { Input } from '../../components/input/Input';
import { onSubmitForm } from '../../utils/form/form';
import { CommonProps } from '../../utils/models/props';
import {
  ValidationPattern,
  ValidationError,
} from '../../utils/models/validation';
import './changeData.scss';
import { UploadFiles } from '../../controllers/UploadFiles';
import {
  storeCurrentUser,
  StoreCurrentUserEvents,
} from '../../store/StoreCurrentUser';
import { getUserResources } from '../../utils/getUserResources';
import { DEFAULT_AVATAR_URL } from '../../utils/constants';
import { getUserInfo } from '../../utils/getUserInfo';
import { UserController } from '../../controllers/User';
import { UserDto } from '../../utils/dto/user';

type ChangeDataType = {
  fileInput: Input;
  displayName: string;
  goBackAside: GoBackAside;
  avatar: Avatar;
  generalInputEmail: GeneralInput;
  generalInputLogin: GeneralInput;
  generalInputName: GeneralInput;
  generalInputSurname: GeneralInput;
  generalInputNickname: GeneralInput;
  generalInputPhoneNumber: GeneralInput;
  generalButtonSave: GeneralButton;
} & CommonProps;

const uploadFiles = new UploadFiles();
const user = new UserController();

export class ChangeData extends Block<ChangeDataType> {
  constructor() {
    super('div', {
      displayName: getUserInfo('first_name'),
      goBackAside: new GoBackAside({
        events: {
          click: () => router.back(),
        },
      }),
      fileInput: new Input({
        class: ['avatar-input'],
        attr: { type: 'file', style: 'display: none', name: 'avatar', accept: '.jpg, .png' },
        events: {
          change: (event) => {
            const eventTargetFiles = (event.target as HTMLInputElement).files;
            if (eventTargetFiles) {
              const formData = new FormData();
              formData.append('avatar', eventTargetFiles[0]);
              uploadFiles.uploadAvatar(formData);
            }
          },
        },
      }),
      avatar: new Avatar({
        avatarURL: getUserResources('avatar') ?? DEFAULT_AVATAR_URL,
        class: ['avatar-wrapper'],
        classImg: 'avatar',
      }),
      generalInputEmail: new GeneralInput({
        input: new Input({
          attr: {
            type: 'email',
            name: 'email',
            value: getUserInfo('email'),
            required: true,
            pattern: ValidationPattern.Email,
          },
        }),
        label: 'email',
        errorText: ValidationError.Email,
      }),
      generalInputLogin: new GeneralInput({
        input: new Input({
          attr: {
            type: 'login',
            name: 'login',
            value: getUserInfo('login'),
            required: true,
            pattern: ValidationPattern.Login,
          },
        }),
        label: 'login',
        errorText: ValidationError.Login,
      }),
      generalInputName: new GeneralInput({
        input: new Input({
          attr: {
            type: 'text',
            name: 'first_name',
            value: getUserInfo('first_name'),
            required: true,
            pattern: ValidationPattern.FirstName,
          },
        }),
        label: 'name',
        errorText: ValidationError.FirstName,
      }),
      generalInputSurname: new GeneralInput({
        input: new Input({
          attr: {
            type: 'text',
            name: 'second_name',
            value: getUserInfo('second_name'),
            required: true,
            pattern: ValidationPattern.SecondName,
          },
        }),
        label: 'surname',
        errorText: ValidationError.SecondName,
      }),
      generalInputNickname: new GeneralInput({
        input: new Input({
          attr: {
            type: 'text',
            name: 'display_name',
            value: getUserInfo('display_name'),
          },
        }),
        label: 'nickname',
        errorText: '',
      }),
      generalInputPhoneNumber: new GeneralInput({
        input: new Input({
          attr: {
            type: 'tel',
            name: 'phone',
            value: getUserInfo('phone'),
            required: true,
            pattern: ValidationPattern.Phone,
          },
        }),
        label: 'phone number',
        errorText: ValidationError.Phone,
      }),
      generalButtonSave: new GeneralButton({
        buttonText: 'Save',
      }),
      events: {
        submit: (event) => {
          const formData = onSubmitForm.apply
            <ChangeData, [Event, string], UserDto>
            (this, [event, '.change-data-form']);
          user.changeUserData(formData);
        },
      },
    });
    this.subscribeToChangeUserData();
  }
  subscribeToChangeUserData(): void {
    storeCurrentUser.on(StoreCurrentUserEvents.Updated, (state) => {
      if (!Array.isArray(this.children.avatar) && state.avatar) {
        const avatarURL = new URL(
          'resources' + state.avatar,
          process.env.YANDEX_PRAKTIKUM_API
        ).toString();
        this.children.avatar.setProps({
          avatarURL,
        });
      }
      if (
        !Array.isArray(this.children.generalInputEmail) &&
        !Array.isArray(this.children.generalInputEmail.children.input)
      ) {
        this.children.generalInputEmail.children.input.setProps({
          attr: {
            type: 'email',
            name: 'email',
            value: state.email,
            required: true,
            pattern: ValidationPattern.Email,
          },
        });
      }
      if (!Array.isArray(this.children.generalInputLogin) &&
        !Array.isArray(this.children.generalInputLogin.children.input)) {
        this.children.generalInputLogin.children.input.setProps({
          attr: {
            type: 'login',
            name: 'login',
            value: state.login,
            required: true,
            pattern: ValidationPattern.Login,
          }
        });
      }
      if (!Array.isArray(this.children.generalInputName) &&
        !Array.isArray(this.children.generalInputName.children.input)) {
        this.children.generalInputName.children.input.setProps({
          attr: {
            type: 'text',
            name: 'first_name',
            value: state.first_name,
            required: true,
            pattern: ValidationPattern.FirstName,
          },
        });
      }
      if (!Array.isArray(this.children.generalInputSurname) &&
        !Array.isArray(this.children.generalInputSurname.children.input)) {
        this.children.generalInputSurname.children.input.setProps({
          attr: {
            type: 'text',
            name: 'second_name',
            value: state.second_name,
            required: true,
            pattern: ValidationPattern.SecondName,
          },
        });
      }
      if (!Array.isArray(this.children.generalInputNickname) &&
        !Array.isArray(this.children.generalInputNickname.children.input)) {
        this.children.generalInputNickname.children.input.setProps({
          attr: {
            type: 'text',
            name: 'display_name',
            value: state.display_name,
          },
        });
      }
      if (!Array.isArray(this.children.generalInputPhoneNumber) &&
        !Array.isArray(this.children.generalInputPhoneNumber.children.input)) {
        this.children.generalInputPhoneNumber.children.input.setProps({
          attr: {
            type: 'tel',
            name: 'phone',
            value: state.phone,
            required: true,
            pattern: ValidationPattern.Phone,
          },
        });
      }
    });
  }

  render(): DocumentFragment {
    return this.compile(changeDataTemplate, this.props);
  }
}
