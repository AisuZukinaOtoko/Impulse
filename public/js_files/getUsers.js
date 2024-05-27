// const axios = require("axios").default;

async function getAccessToken() {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://dev-kpk2hlg2oudfcpev.us.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      data: {
        client_id: "2S2JyjlOpDaAXNXOZ7h6Q8NgMks4IgCP",
        client_secret: "SVY-2ElEz_5NAL93keYTC64DBMHgd6a2nfQNGrI9BOIwSiA-vLFHV4JHBOuhbaCj",
        audience: "https://dev-kpk2hlg2oudfcpev.us.auth0.com/api/v2/",
        grant_type: "client_credentials"
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
}

async function getUserRoles(userId, accessToken) {
  try {
    const rolesResponse = await axios({
      method: 'GET',
      url: `https://dev-kpk2hlg2oudfcpev.us.auth0.com/api/v2/users/${userId}/roles`,
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return rolesResponse.data;
  } catch (error) {
    console.error(`Error fetching roles for user ${userId}:`, error);
    return [];
  }
}

async function getUserDetails(accessToken) {
  try {
    const options = {
      method: 'GET',
      url: 'https://dev-kpk2hlg2oudfcpev.us.auth0.com/api/v2/users',
      headers: { Authorization: `Bearer ${accessToken}` }
    };

    const response = await axios.request(options);
    const users = response.data;

    const transformedUsers = [];

    for (const user of users) {
      const roles = await getUserRoles(user.user_id, accessToken);
      const roleName = roles.length > 0 ? roles[0].name : 'No Role'; // Assuming one role per user

      const transformedUser = {
        name: user.name,
        email: user.email,
        roles: roleName
      };

      transformedUsers.push(transformedUser);
    }

    // Log the transformed users
    console.log(JSON.stringify(transformedUsers, null, 2));
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
}

async function main() {
  try {
    const accessToken = await getAccessToken();
    await getUserDetails(accessToken);
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

main();
