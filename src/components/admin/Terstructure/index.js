import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  MinusSquare,
  PlusSquare,
  makeTree,
  StyledTreeItem,
  StyledEmptyTreeItem,
} from "../../ui/TreeComponent";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getAll, clear } from "../../../actions/terstructureActions";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

//https://javascript.tutorialink.com/material-ui-how-to-add-border-in-treeview/
//https://mui.com/components/tree-view/

const renderTree = (nodes) => {
  return Array.isArray(nodes.children) && nodes.children.length ? (
    <StyledTreeItem
      key={nodes.id}
      nodeId={nodes.id.toString()}
      label={nodes.name}
    >
      {nodes.children.map((node) => renderTree(node))}
    </StyledTreeItem>
  ) : (
    <StyledEmptyTreeItem
      key={nodes.id}
      nodeId={nodes.id.toString()}
      label={nodes.name}
      endIcon={null}
    />
  );
};

const Terstructure = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { terstructureList } = useSelector(({ terstructure }) => {
    return terstructure;
  });

  useEffect(() => {
    const fetchTerstructure = async () => {
      dispatch(getAll());
    };

    fetchTerstructure();

    return () => {
      dispatch(clear());
    };
  }, [dispatch]);

  const memoizedTreeData = useMemo(
    () => makeTree(terstructureList, null),
    [terstructureList]
  );

  const handlerAddClick = useCallback(
    (event) => {
      event.preventDefault();
      navigate("/admin/terstructure/new");
    },
    [navigate]
  );

  const handlerOnClickTreeItem = (event, id) => {
    if (
      event.target.closest(".MuiTreeItem-iconContainer") ||
      event.target.classList.contains("MuiTreeItem-content")
    ) {
      return;
    }

    if (event.target.nodeName.toLocaleLowerCase() !== "div") return;

    navigate(`/admin/terstructure/${id}`);
  };

  return (
    <>
      <h1>Территориальная структура</h1>
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ paddingRight: "3em" }}
      >
        <IconButton
          aria-label="add"
          color="primary"
          onClick={handlerAddClick}
          size="large"
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="error"
          //disabled={selected.length === 0}
          //onClick={(event) => setOpenDialog(true)}
          size="large"
        >
          <DeleteForeverIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box sx={{ ml: { md: 3 }, width: { md: "800px" } }}>
        {memoizedTreeData.length ? (
          <TreeView
            aria-label="customized"
            defaultExpanded={["1"]}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            //defaultEndIcon={<CloseSquare />}
            onNodeSelect={handlerOnClickTreeItem}
            sx={{
              "& .MuiTreeItem-content": {
                width: "fit-content",
              },
            }}
          >
            {renderTree(memoizedTreeData[0])}
          </TreeView>
        ) : null}
      </Box>
    </>
  );
};

export default Terstructure;
