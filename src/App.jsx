import { useState, useEffect } from "react"
import Form from "./components/Form"
import ItemsList from "./components/ItemsList"
import { toast } from 'react-toastify'

// localStorage
function getItemsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('items')) || []
}

// dark/light mode
function getModeFromLocalStorage() {
  return localStorage.getItem('theme') || 'light'
}

const themes = {
  light: 'light',
  dark: 'dark'
}

// function
function App() {

  // items
  const [items, setItems] = useState(getItemsFromLocalStorage())

  // theme
  const [theme, setTheme] = useState(getModeFromLocalStorage())

  const handleTheme = () => {
    setTheme((prev) => {
      return prev === 'dark' ? 'light' : 'dark'
    })
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
    toast.info('The change is complete')
  }

  // add new item
  const addNewItem = (newItem) => {
    setItems((prev) => {
      return [...prev, newItem]
    })
    toast.success(`You have added an item`)
  }

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
    if (theme === 'light') {
      document.body.classList.remove('dark')
    }else {
      document.body.classList.add('dark')
    }
    localStorage.setItem('theme', theme)
  }, [items, theme])


  // delete item
  const deleteItem = (id) => {
    setItems((prev) => {
      return prev.filter((item) => item.id !== id)
    })
    toast.error("You have deleted the item")
  }

  return (
    <div className="bg-slate-200 h-screen grid place-items-center dark:bg-[#421] select-none">
      <div className="bg-white max-w-[600px] w-full rounded relative p-8 dark:bg-[#223]">
        <div className="flex items-center justify-center mb-7">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" onChange={handleTheme} defaultChecked={theme === 'light' ? false : true} />
            <div className="w-7 h-3 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[13px] after:w-[16.7px] after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">mode</span>
          </label>
        </div>
        <h1 className="text-3xl text-center mb-8 dark:text-white">Grocery Bud</h1>
        <Form addNewItem={addNewItem} />
        {items && <ItemsList items={items} deleteItem={deleteItem} changeCompleted={changeCompleted} />}
      </div>
    </div>
  )
}

export default App