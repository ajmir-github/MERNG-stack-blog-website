export default function Profile({ name }) {
  return (
    <>
      <h1>{name}</h1>
    </>
  );
}

export async function getServerSideProps(context) {
  console.log(context.req.cookies.auth);
  return {
    props: {
      name: "Ajmir Khan",
    },
  };
}
