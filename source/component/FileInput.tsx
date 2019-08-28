import * as React from 'react';
import classNames from 'classnames';

import style from './FileInput.less';

interface IProps {
  accept?: string;
  name: string;
  required?: boolean;
  value?: string;
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
    const { files } = event.target as HTMLInputElement;

    if (files && files[0])
      this.setState({
        value: URL.createObjectURL(files[0]),
        file: files[0].name
      });
  };

  render() {
    const { name, required, accept } = this.props,
      { value, file } = this.state;

    return (
      <div
        className={classNames(style.container, value && style.active)}
        style={{ backgroundImage: `url(${value})` }}
        title={file}
      >
        <input
          type="file"
          name={name}
          required={required}
          accept={accept}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
