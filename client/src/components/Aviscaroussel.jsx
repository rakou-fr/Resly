import { useEffect, useState } from "react";

export default function AvisCaroussel() {
    const [avis, setAvis] = useState([]);

    async function getAvis() {
        const response = await fetch("/data/Avis.json");
        const data = await response.json();
        setAvis(data);
      }

    useEffect(()=>{
        getAvis()
      },[])

    return (
        <div className="flex items-center justify-center">
            {avis.map(item => (
            <section>
                <p>{item.nom}</p>
            </section>
            ))}
        </div>
    )
}
