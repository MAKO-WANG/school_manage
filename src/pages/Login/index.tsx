import {
  LoginForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from '@/services';
import { message } from 'antd';
import { history } from 'umi';

const LARGE_SIZE = 'large';

const LoginPage: React.FC = () => {
  const handleSubmit = async (values: USER_API.LoginBody) => {
    console.log(values);
    try {
      //   username: 'admin101',
      //   password: 'Wy3062278221,',
      //   identity: 0,
      await login(values);
      message.success('登录成功');
      if (!history) return;
      history.push('/');
      return;
    } catch (error) {
      console.log(error);
      message.error('登录失败');
    }
  };
  return (
    <LoginForm
      // backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
      logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
      title=""
      subTitle="学校管理系统"
      onFinish={async (values: USER_API.LoginBody) => {
        await handleSubmit(values);
      }}
    >
      <ProFormSelect
        name="identity"
        fieldProps={{
          size: LARGE_SIZE,
        }}
        options={[
          { label: '管理员', value: 0 },
          { label: '老师', value: 1 },
          { label: '学生', value: 2 },
        ]}
        placeholder={'请选择角色'}
        rules={[{ required: true, message: '请选择角色!' }]}
      />
      <ProFormText
        name="username"
        fieldProps={{
          size: LARGE_SIZE,
          prefix: <UserOutlined className={'prefixIcon'} />,
        }}
        placeholder={'用户名'}
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: LARGE_SIZE,
          prefix: <LockOutlined className={'prefixIcon'} />,
        }}
        placeholder={'密码'}
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
        ]}
      />
    </LoginForm>
  );
};

export default LoginPage;
