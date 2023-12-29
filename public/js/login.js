/* eslint-disable */

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '',
      data: {
        email,
        password
      }
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
});
