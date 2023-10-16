import { Layout } from 'react-admin';

export const MyLayout = (props) => (
  <Layout {...props}>
    <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
      {props.children}
    </div>
  </Layout>
);
