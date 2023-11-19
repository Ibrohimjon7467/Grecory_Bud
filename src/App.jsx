import { useState, useEffect } from "react"
import Form from "./components/Form"
import ItemsList from "./components/ItemsList"
import { toast } from 'react-toastify'

function App() {


  // theme
  const [theme, setTheme] = useState("light")
  
  const element = document.documentElement

  useEffect(() => {
    switch (window.matchMedia("prefer-color-scheme: dark").matches) {
      case "dark":
        element.classList.add("dark")
        localStorage.setItem("theme", "dark")
        break;
      case "light":
        element.classList.remove("dark")
        localStorage.setItem("theme", "light")
        break;
    }
  }, [])

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark")
        localStorage.setItem("theme", "dark")
        break;
      case "light":
        element.classList.remove("dark")
        localStorage.setItem("theme", "light")
        break;
      default:
        localStorage.setItem("theme")
        break;
    }
  }, [theme])

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }



  // items
  const [items, setItems] = useState([
    {
      id: 1,
      text: 'Hello',
      completed: false,
    },
    {
      id: 2,
      text: 'Nice Too',
      completed: false,
    },
    {
      id: 3,
      text: "I'm programer",
      completed: false,
    },
    {
      id: 4,
      text: "Play Computer",
      completed: false,
    }
  ])

  // delete item
  const deleteItem = (id) => {
    setItems((prev) => {
      return prev.filter((item) => item.id !== id)
    })
    toast.error("You deleted an item")
  }

  // change completed
  const changeCompleted = (id) => {

    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed }
        } else {
          return item
        }
      })
    })
  }

  return (
    <div className="bg-slate-200 h-screen grid place-items-center dark:bg-[#333]">
      <div className="bg-white max-w-[600px] w-full rounded relative p-8 dark:bg-slate-700">
        <h1 className="text-3xl text-center mb-8 dark:text-white">Grocery Bud</h1>
        <button className="absolute top-1 right-2 px-[13px] rounded bg-slate-200 text-[#333] dark:text-slate-200 dark:bg-[#333]" onClick={handleThemeSwitch}>*</button>
        <Form />
        <ItemsList items={items} deleteItem={deleteItem} changeCompleted={changeCompleted} />
      </div>
    </div>
  )
}

export default App