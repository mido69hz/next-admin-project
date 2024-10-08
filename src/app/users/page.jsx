"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/typography/h3";
import { UsersTable } from "./table";
import { UserCreateDialog } from "./user-create-dialog";
import { useEffect, useState } from "react";

const Users = () => {
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true); 

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      
        setHasMoreData(data.length > limit);
      });
  }, [limit]);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <TypographyH3>Хэрэглэгчид</TypographyH3>
            <Button variant="outline" onClick={() => setCreateModalOpen(true)}>
              Шинээр нэмэх
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable limit={limit} data={data} />
          {hasMoreData && (
            <div className="p-8 flex justify-center">
              <button onClick={() => setLimit(limit + 10)} variant="outline">
                Load more...
              </button>
            </div>
          )}
        </CardContent>
      </Card>
      <UserCreateDialog open={createModalOpen} onClose={setCreateModalOpen} />
    </div>
  );
};

export default Users;
