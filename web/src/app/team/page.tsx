import Teams from "@/components/Teams";

export default async function HomePage() {

    return (
        <div className="flex flex-col gap-4">
            <h1>Equipos</h1>
            <Teams></Teams>
        </div>
    )
}