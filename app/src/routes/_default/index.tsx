import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, IconButton } from '@mui/material'
import { Add, Edit, Save } from '@mui/icons-material'

import GroceryList from '@components/GroceryList'
import GroceryForm from '@components/GroceryForm'

export const Route = createFileRoute('/_default/')({
  component: Index, 
})

function Index() {
  const [openForm, setOpenForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleFormOpen = () => {
    setOpenForm(true)
  }
  
  return (
    <Card sx={{ my: 4 }} variant="outlined">
      <CardHeader
        title="Grocery List"
        action={
          <>
            <IconButton onClick={handleEditClick}>{isEditing ? <Save /> : <Edit />}</IconButton>
            <IconButton onClick={handleFormOpen}>
              <Add />
            </IconButton>
          </>
        }
      />
      <CardContent>
        <GroceryList isEditing={isEditing} />
        <GroceryForm openForm={openForm} setOpenForm={setOpenForm} />
      </CardContent>
    </Card>
  )
}