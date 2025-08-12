import { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import TaskManager from "./components/task-manager";
import { supabase } from "./supabase-client";

function App() {
  const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const {data} = await supabase.auth.getSession();

    setSession(data.session);
  }

  useEffect(() => {
    // fetchSession();

    const {data: authListener} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => authListener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    const {error} = await supabase.auth.signOut();

    if(error) {
      console.log('Error logging out...');
      return;
    }

    // setSession(null);
  }

  return (
    <>
      {
        session ? (
          <>
          <button onClick={logout}>Logout</button>
          <TaskManager session={session} />
          </>
        )
        :
        <Auth />
      }
    </>
  );
}

export default App;
