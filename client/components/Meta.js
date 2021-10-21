import Head from "next/head";

const Meta = ({ title, description }) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content={description} />
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
        <title>{title}</title>
      </Head>
    </>
  );
};

Meta.defaultProps = {
  title: 'Art Supplies Inventory',
  description: 'View, update, add to the inventory database'
};

export default Meta;