import Axios from 'axios'

// 接続先ベースURLを以下に設定
// development: http://localhost:5200
// production : https://reacttodoapi.azurewebsites.net/
Axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default Axios
