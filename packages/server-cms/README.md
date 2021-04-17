# Server-CMS README

## Important things to consider during development
### 1.  `schema.graphql` from the Hasura database repo
This file is important as it contains the necessary typeDefs we need for the 
Apollo server. Without this, the graphql functionality won't work, and we'd 
have to manually enter all the types, which is not feasible.

We use this file so that we can easily get the schema of the Hasura database 
and be able to interact with its data.

#### How to get this
This file is obtained from a running Hasura database instance of the 
`fashion-app-database-items` repo.

You'll need to run the `get-graphql-schema.sh` shell file to obtain this file.

That Hasura repo needs to be running, and then you need to call the shell 
file command (above) to get the `schema.graphql`.

Whenever the database's schema is updated, run that shell file, and copy the 
file over to this package. If the repo already has the file, you can just 
copy it over, but in case it's not the latest version, then you need to run 
the shell command. 

The directory of the file should be something like:
`.../packages/server-cms/schema.graphql`.

**IMPORTANT:** For now, you'll have to also manually delete the top-most 
section (first 5 
lines of that file. The code to delete looks like this:

````
schema {
  query: query_root
  mutation: mutation_root
  subscription: subscription_root
}
````

If you don't delete that, you'll get some error about `value`, so make sure 
to delete it every time you copy the file over to this repo.

### 2. Auto generating/updating of Enum types from `schema.graphql` (1)
With regards to the schema generated above, some of the types will be 
entered manually into our own schema/typedefs collection, whereas the rest 
will be copied via a script.

In this section, we are dealing with all enum types from that file.

The "types" of enum types we'll be copying from that schema file are:
* **Pure value table enum**: These enums are basically enums of values of the 
  tables in Hasura we manually set as an enum. Essentially constant values 
  that may be used/visible on an end user's UI.
* **Selection keys table enum**: These are all the fields/columns of a 
  table represented in an enum. Unlike the type above, this kind of enum 
  isn't typically visible at all the to the end user, as its all done by the 
  server and/or the react client, behind the scenes.
* 

````
  enum fabric_layer_types_enum {
    Fill
    Interlining
    Lining
    Shell
  }
````

````
  # select columns of table "item_maindata_revisions"
  enum item_maindata_revisions_select_column {
    # column name
    id

    # column name
    item_id

    # column name
    revision

    # column name
    state
  }
````
