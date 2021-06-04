  var firebaseConfig = {
    apiKey: "AIzaSyDr7xARTOYIqH8OAZ8iUVlXeVruCdbMW6M",
    authDomain: "my-favourite-f1-drivers.firebaseapp.com",
    projectId: "my-favourite-f1-drivers",
    storageBucket: "my-favourite-f1-drivers.appspot.com",
    messagingSenderId: "808147592593",
    appId: "1:808147592593:web:3602728b1a5f54b5356630",
    measurementId: "G-5TQZ5G6C55"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const auth = firebase.auth();
        let logInButton = document.getElementById('login-button');
        logInButton.id = 'login-button';
        let userName = document.getElementById('username');
        let pass = document.getElementById('password');
        let h2 = document.getElementById('second-header');
        let form = document.getElementById('login-form');
        let driverSelection = document.getElementById('drivers-selection');
        logInButton.addEventListener('click', function (e) {
            firebase.auth().signInWithEmailAndPassword(userName.value, pass.value).
                then(res => {
                    h2.textContent = `Welcome ${res.user.email}`
                    form.style.display = 'none';
                    let signOutButton = document.createElement('button');
                    signOutButton.id = 'sign-out';
                    signOutButton.textContent = 'Sign out';
                    document.getElementsByTagName('body')[0].appendChild(signOutButton);
        
                    let driversElement = document.getElementById('drivers');
                    driverSelection.textContent = "Select Driver:";
                     
                    let url = `https://my-favourite-f1-drivers-default-rtdb.firebaseio.com/`;
                    fetch(`${url}drivers/.json`).
                    then(res => res.json()).
                    then(data => {
                        let driver = Object.keys(data).map(x =>
                            `<li class='driver-list' data-key=${x}>${data[x].driver}</li>`).
                            join('');
                            driversElement.innerHTML = driver;
                    })
                    
                    driversElement.addEventListener('click', function(e) {
                        
                        document.getElementById('info').textContent = 'Driver Info:';
                        
                        
                        let currentDriver = e.target.dataset.key;
                        let info = document.getElementById('drivers-info');
                        fetch(`${url}drivers/${currentDriver}.json`).
                        then(res => res.json()).
                        then(drivers => {
                            info.innerHTML = `<strong>${drivers.driver}<br/> 
                                Nationality: ${drivers.nationality}<br/> 
                                Birthdate: ${drivers.birthdate}<br/> 
                                Team: ${drivers.team}<strong/><br/>
                                <div class='picture'>
                                Image: <img src=${drivers.pic} alt="nothere">
                                </div>`
                           
                        })
                        
                   })

                    signOutButton.addEventListener('click', function(e) {
                        document.getElementById('info').textContent = '';
                        document.querySelector('#drivers-info').textContent = '';
                        document.querySelector('#drivers').textContent = '';
                        document.querySelector('#drivers-selection').textContent = '';
                        form.style.display = 'flex';
                        signOutButton.remove();
                        h2.textContent = 'Please log in.'
                        userName.value = '';
                        pass.value = '';
                        auth.signOut();
                    })

                }).
                catch(err => {
                    console.log(`Error: ${err}`)
                    h2.textContent = 'There is no user record corresponding to this identifier.';
                })
        })
        let getSignOutButton = document.getElementById('sign-out');
