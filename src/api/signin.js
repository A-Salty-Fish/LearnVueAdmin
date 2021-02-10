import axios from 'axios'
export function signInAPI() {
  return {
    getToday: function() {
      axios.get('http://localhost:8080/signin/getToday').then(res => {
        console.log(res.data)
      })
    }
  }
}
