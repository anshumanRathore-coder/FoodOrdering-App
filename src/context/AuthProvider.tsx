import { supabase } from "@/lib/superbase";
import { Session } from "@supabase/supabase-js";
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type AuthType = {
    session: Session | null;
    loading: boolean;
    profile:any;
    isAdmin:boolean,
};

// Define the context with a default value
const authContext = createContext<AuthType>({
    session: null,
    loading: false,
    profile:null,
    isAdmin:false,
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [profile,setProfile]=useState(null);
    useEffect(()=>{
        const fetchSession=async()=>{
            setLoading(true);
            const {data:{session}}=await supabase.auth.getSession();
            setSession(session)
            if (session) {
                // fetch profile
                const { data,error } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();
                setProfile(data || null);
                // console.log('data',data,error)
              }
            setLoading(false)
        }
        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
          });
    },[])
    // @ts-ignore
    console.log(profile,'  ',profile?.group==='ADMIN');
    if(profile || !session){
        return(
        // @ts-ignore
        <authContext.Provider value={{ session, loading ,profile,isAdmin:profile?.group==='ADMIN' }}>
            {children}
        </authContext.Provider>
 
        )
    }
};

export const useAuth=()=>useContext(authContext);
