import React from 'react'

export default async  function Category({params} :{params:Promise<{category:string}>}){
  const category = (await params).category;
  //const formattedCategory = category.replace(/\s+/g, "-");
  //console.log(formattedCategory);
  

  return (
    //<div>viendo {formattedCategory}
    <div>viendo {category}
    </div>
  )
}
