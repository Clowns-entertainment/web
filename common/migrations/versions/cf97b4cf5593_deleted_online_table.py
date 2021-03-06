"""Deleted online table

Revision ID: cf97b4cf5593
Revises: 8ddd44257b8c
Create Date: 2022-03-05 01:19:18.101449

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'cf97b4cf5593'
down_revision = '8ddd44257b8c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('online')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('online',
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('expired', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['accounts.id'], name='online_user_id_fkey'),
    sa.PrimaryKeyConstraint('user_id', name='online_pkey')
    )
    # ### end Alembic commands ###
