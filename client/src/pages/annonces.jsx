import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function Annonces() {
  return (
    <div className="flex flex-col space-y-4 ">
      <Card>
        <CardHeader>
          <CardTitle>Annonces</CardTitle>
          <p className="text-sm text-muted-foreground">
            Toutes les annonces du bot
          </p>
        </CardHeader>
      </Card>
    </div>
    )
}