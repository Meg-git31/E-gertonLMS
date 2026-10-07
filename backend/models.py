from typing import Optional 
from sqlmodel import SQLModel, Field 
 
class Course(SQLModel, table=True): 
    id: Optional[int] = Field(default=None, primary_key=True) 
    title: str 
    code: str 
    description: str
