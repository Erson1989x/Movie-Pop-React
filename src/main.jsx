import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import StarRating from './components/StarRating/StarRating'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <App />
  {/*<StarRating maxRating={5} message={["terrible", "bad", "ok", "good", "great"]} />
   <StarRating maxRating={10} color="red" size="64px" className="test" defaultRating={3} />*/}
  </StrictMode>
)
