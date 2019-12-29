let password = ''
let newPassword = '';
let validatedPass = '';
const emailLength = 5;
const newPassLength = 6;
const email = prompt('Enter your e-mail', '');
if (!email) {
  alert('Canceled.');
} else if (email.length < emailLength) {
  alert('I don\'t know any emails having name length less than 5 symbols');
} else if (email === 'user@gmail.com' || email === 'admin@gmail.com') {
  password = prompt('Enter your password', '');
  if (!password) {
    alert('Canceled')
  } else if (email === 'user@gmail.com' && password === 'UserPass'
    || email === 'admin@gmail.com' && password === 'AdminPass') {
    if (confirm('Do you want to change your password?')) {
      if (prompt('Write your current password', '') === password) {
        if (!password) {
          alert('Canceled');
        } else if (email === 'user@gmail.com' && password === 'UserPass'
          || email === 'admin@gmail.com' && password === 'AdminPass') {
          newPassword = prompt('Write your new password', '');
          if (!newPassword) {
            alert('Canceled');
          } else if (newPassword.length < newPassLength) {
            alert('It’s too short password. Sorry.');
          } else {
            validatedPass = prompt('Write your new password again', '');
            if (!validatedPass) {
              alert('Canceled');
            } else if (validatedPass === newPassword) {
              password = newPassword;
              alert('You have successfully changed your password');
            } else {
              alert('You wrote the wrong password');
            }
          }
        }
      } else {
        alert('Wrong password');
      }
    } else {
      alert('You have failed the change');
    }
  } else {
    alert('Wrong password');
  }
} else {
  alert('I don’t know you');
}