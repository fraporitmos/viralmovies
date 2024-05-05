import React from 'react'

const MovieItem = ({ imgPoster, name, platform, description, categoriesObj }) => {
  return (
    <tr>
      <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <a href="#" class="relative block">
              <img alt="profil" src={imgPoster} class="mx-auto object-cover rounded-md h-24 w-18 " />
            </a>
          </div>
          <div class="ml-3">
            <p class="text-gray-900  whitespace-no-wrap line-clamp-3	">
              {name}
            </p>
          </div>
        </div>
      </td>
      <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p class="text-gray-900 whitespace-no-wrap">
          {platform}
        </p>
      </td>
      <td class="px-5 py-5  text-sm bg-white border-b border-gray-200">
        <p class="text-gray-900 w-48 whitespace-no-wrap line-clamp-3	">
          {description}
        </p>
      </td>
      <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p class="text-gray-900 whitespace-no-wrap">
          {
            Object.values(categoriesObj).join(', ')
          }
        </p>
      </td>
      <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <span class="relative inline-block px-3 py-1 font-semibold leading-tight text-blue-900">
          <span aria-hidden="true" class="absolute inset-0 bg-blue-200 rounded-full opacity-50">
          </span>
          <span class="relative cursor-pointer"
          >
            Editar
          </span>

        </span>
        <span class="relative inline-block px-3 py-1 font-semibold leading-tight text-red-900">
          <span aria-hidden="true" class="absolute inset-0 bg-red-200 rounded-full opacity-50">
          </span>
          <span class="relative cursor-pointer"
          >
            Delete
          </span>

        </span>
      </td>
    </tr>
  )
}

export default MovieItem