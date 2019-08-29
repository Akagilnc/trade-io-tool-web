import * as React from 'react';
import classNames from 'classnames';

import style from './FileInput.less';

interface IProps {
  accept?: string;
  name: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export default class FileInput extends React.PureComponent<IProps> {
  state = {
    value: '',
    file: ''
  };

  static getDerivedStateFromProps({ value }: IProps, state: any) {
    return state.value ? state : { ...state, value };
  }

  onChange = (event: React.FormEvent) => {
    const { files } = event.target as HTMLInputElement,
      { onChange } = this.props;

    if (files && files[0])
      this.setState(
        {
          value: URL.createObjectURL(files[0]),
          file: files[0].name
        },
        () => onChange && onChange(this.state.value)
      );
  };

  render() {
    const { name, required, accept } = this.props,
      { value, file } = this.state;

    const empty = !value || value.startsWith('blob:');

    return (
      <div
        className={classNames(style.container, value && style.active)}
        style={{ backgroundImage: `url(${value})` }}
        title={file}
      >
        {!empty && <input type="hidden" name={name} value={value} />}
        <input
          type="file"
          name={empty ? name : undefined}
          required={!value && required}
          accept={accept}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
