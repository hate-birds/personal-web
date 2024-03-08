"use client"
import { ModeToggle } from "@/components/ModeToggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react";

type User = {
  name: string,
  qualification: string,
  email: string,
}

type CountryProbability = {
  country_id: string,
  probability: number
}


export default function Home() {

  const PersonalInfoURL = "https://cabinet.miem.hse.ru/api/student_profile"

  const NationalityURL = 'https://api.nationalize.io?name=Дима'

  const axios = require('axios');

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDkzMDM1MjAsImV4cCI6MTcyNjU4MzUyMCwidXNlcm5hbWUiOiLQnNC-0LvRh9Cw0L3QvtCyINCU0LzQuNGC0YDQuNC5INCh0LXRgNCz0LXQtdCy0LjRhyIsImVtYWlsIjoiZHNtb2xjaGFub3ZAZWR1LmhzZS5ydSIsInN0YWZmIjpmYWxzZSwic3R1ZGVudCI6dHJ1ZX0.aY1FhG7RwB8nzVKUUTR8JRd9MsKKtdGhMfjNRFOxCTDPsnIIyjJxchFZkIHqcp2ROE6GkFAgZ-YX_tFykaAiqH_9dAqp4eWS5zZPGUBVAwhfCFKT_Ae3jIdW_8Vwh7A4Go7uryPiaIAH7uqqrM43UEqgmrAA9r7o-cTB6tX_FunnYE7M5QEGonX2c4_BMXnUVTVZyX90oiSTrv7YKcQDEV3pxHfq3WXAuoe5rGhmnKHbtBe52DzZ8dvheT0vF01JgRlS4dCPHF17KW0yjDtyMI2wHieO2eoQk7UdRzp0hn-1InbbP8ZYMue_fibthxjfl1CdOfCJOTtta3kb2GOPlIZfWG7Jun4HgKCrPae5homqrbZemIyj5hlm-k72v8iO-WrzhHx8q4UCSTzSdJ86iCr0LDIbS-86Pw7l8paQSH0zYAh-yHYpXD-zY8tPsEy4RGR3tr1nf4M1mNti7x-G4WCZ_Y3KwWLxCo43jhOtYh-gEhXdikufk1-SW2qRKdH5F8fbC3rNYrPQrsxEcImUk4t-F_CW9phmBbwpSoqj1lQ_MRI7EdyEa4hD6k2GCLN-JcEqOOOhWncZYGep3MW18AS2j1SYRTWTdHdw_A_GTQQvmjZMs2QdJnsuIni54_WR9RfjoXXKgspNVnuez3afi7bJ0bs9wvh6Jj-AYZTbDbg"

  const [userData, setUserData] = useState<User>()
  const [nationality, setNationality] = useState<CountryProbability[]>()

  const config = {
    headers: {
      "X-Auth-Token": token,
    },
  }

  console.log(nationality)

  useEffect(() => {
    if (userData?.name) {
      axios.get(NationalityURL)
        .then((response: any) => {
          console.log(response.data.country)
          setNationality(response.data.country)
        })
        .catch((error: any) => console.error(error));
    }

  }, [userData])

  useEffect(() => {
    axios.get(PersonalInfoURL, config)
      .then((response: any) => {
        const data = response.data.data[0].main
        console.log(data)

        setUserData({
          name: data.name,
          qualification: data.description[0],
          email: data.email,
        })
      })
      .catch((error: any) => console.error(error));


  }, [])


  return (
    <main className="flex min-h-screen flex-col items-center gap-5">
      <header className="flex flex-row justify-between items-center w-full py-4 px-20 border-b">
        <p className="text-xl">Мой сайт</p>
        <ModeToggle />
      </header>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">Профиль учащегося</CardTitle>
          <CardDescription className="text-xl">Информация о легенде</CardDescription>
        </CardHeader>
        <CardContent className="text-lg">
          <div>
            {`Имя: ${userData?.name}`}
          </div>
          <div>
            {`Почта: ${userData?.email}`}
          </div>
          <div>
            {`Кто я?: ${userData?.qualification}`}
          </div>
          <h2 className="text-xl mt-6 font-bold">Вероятность национальности</h2>
          <div className="flex flex-col mt-2 gap-2">
            {nationality?.map((element) => {
              return (
                <div className="flex flex-col gap-1">
                  <p>{element.country_id}</p>
                  <Progress value={element.probability * 100} />
                </div>
              )
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>
    </main>
  );
}
