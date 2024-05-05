import React from "react";

const MovieItem = ({
  imgPoster,
  name,
  platform,
  description,
  categoriesObj,
}) => {
  return (
    <tr>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <a href="#" className="relative block">
              <img
                alt="profil"
                src={imgPoster}
                className="mx-auto object-cover rounded-md h-24 w-18 "
              />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-gray-900  whitespace-no-wrap line-clamp-3	">
              {name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{platform}</p>
      </td>
      <td className="px-5 py-5  text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 w-48 whitespace-no-wrap line-clamp-3	">
          {description}
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">
          {Object.values(categoriesObj).join(", ")}
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-blue-900">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-blue-200 rounded-full opacity-50"
          ></span>
          <span className="relative cursor-pointer">Editar</span>
        </span>
        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-red-900">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 rounded-full opacity-50"
          ></span>
          <span className="relative cursor-pointer">Delete</span>
        </span>
      </td>
    </tr>
  );
};

export default MovieItem;
