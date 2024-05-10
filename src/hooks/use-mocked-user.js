export function useMockedUser() {
  const user = {
    id: "8864c717-587d-472a-929a-8e5f298024da-0",
    displayName: "Sagar Budhathoki",
    email: "sagarbudhathoki102@gmail.com",
    password: "sagar102.",
    photoURL: `/assets/images/avatars/avatar_2.jpg`,
    phoneNumber: "+40 777666555",
    country: "Nepal",
    address: "90210 Broadway Blvd",
    state: "California",
    city: "San Francisco",
    zipCode: "94116",
    about: "Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.",
    role: "admin",
    isPublic: true
  };

  return { user };
}
