import Login from '../components/authStatus';

export default async function Home() {
  return (
    <div>
        <div className="container">
            <h1>Home</h1>
            <Login />
        </div>
    </div>
  )
}