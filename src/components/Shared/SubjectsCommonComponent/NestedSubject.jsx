import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

// eslint-disable-next-line no-unused-vars
const NestedSubjectItem = forwardRef(({ label, children }, ref) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Menu
        placement="right-start"
        open={openMenu}
        handler={setOpenMenu}
        allowHover
        offset={15}
      >
        <MenuHandler>
          <MenuItem className="flex items-center justify-between">
            <p className="!w-full !h-full !outline-none !border-none">
              {label}
            </p>
            {children?.length > 0 && (
              <IoIosArrowDown
                className={`h-3.5 w-3.5 transition-transform ${
                  openMenu ? "rotate-90" : ""
                }`}
              />
            )}
          </MenuItem>
        </MenuHandler>
        {children?.length > 0 && <MenuList>{children}</MenuList>}
      </Menu>
    </>
  );
});

NestedSubjectItem.displayName = "NestedMenuItem";

NestedSubjectItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

NestedSubjectItem.defaultProps = {
  children: null,
};

export { NestedSubjectItem };

const NestedSubject = ({ data, handleSelectChange, subjects, setSubjects }) => (
  <Menu placement="bottom-start">
    <MenuHandler>
      <div>
        <Button
          variant="text"
          className="w-full transition-all duration-300 ease-in-out border py-2.5 ps-3 pr-0 rounded-lg border-blue-gray-700/50 flex justify-between items-center text-sm font-medium bg-gray-50 hover:bg-gray-50 h-10"
        >
          <span className="mt-0.5 inline-block capitalize">
            Choose your subjects
          </span>
          <span>
            <IoIosArrowDown/>
          </span>
        </Button>
      </div>
    </MenuHandler>
    <MenuList>
      {data &&
        data?.map((item) =>
          item?.subSubjects?.length ? (
            <NestedSubjectItem key={item?._id} label={item?.mainSubject}>
              {item?.subSubjects?.map((subSubItem) => (
                <MenuItem
                  key={subSubItem?._id}
                  className="cursor-pointer"
                  onClick={() =>
                    handleSelectChange(
                      subjects,
                      setSubjects,
                      item?.mainSubject,
                      subSubItem?.subSubject
                    )
                  }
                >
                  <Link className="!w-full !h-full !outline-none !border-none">
                    {subSubItem?.subSubject}
                  </Link>
                </MenuItem>
              ))}
            </NestedSubjectItem>
          ) : (
            <MenuItem
              key={item?._id}
              className="cursor-pointer"
              onClick={() =>
                handleSelectChange(subjects, setSubjects, item?.mainSubject)
              }
            >
              <Link className="!w-full !h-full !outline-none !border-none">
                {item?.mainSubject}
              </Link>
            </MenuItem>
          )
        )}
    </MenuList>
  </Menu>
);

NestedSubject.propTypes = {
  data: PropTypes.array,
  handleSelectChange: PropTypes.func,
};

export default NestedSubject;
