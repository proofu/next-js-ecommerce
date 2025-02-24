import React from 'react'

export default async  function Category({params} :{params:Promise<{category:string}>}){
  const category = (await params).category;

  return (
    <div>viendo {category}      
    </div>
  )
}
