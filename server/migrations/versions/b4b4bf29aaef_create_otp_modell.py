"""Create OTP model

Revision ID: b4b4bf29aaef
Revises: 
Create Date: 2025-08-26 14:28:49.267079
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'b4b4bf29aaef'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table('otp',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(length=120), nullable=False),
        sa.Column('code', sa.String(length=6), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('expires_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    op.drop_table('otp')
