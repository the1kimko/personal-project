"""Initial migration

Revision ID: 015b614eb867
Revises: 
Create Date: 2024-11-22 13:53:55.021437

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '015b614eb867'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=150), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('stock', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('image_url', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('services',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=150), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('available', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('image_url', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=150), nullable=False),
    sa.Column('email', sa.String(length=150), nullable=False),
    sa.Column('password_hash', sa.String(length=128), nullable=False),
    sa.Column('role', sa.String(length=50), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('carts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_carts_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('order_date', sa.DateTime(), nullable=True),
    sa.Column('status', sa.String(length=50), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_orders_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product_orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=True),
    sa.Column('order_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name=op.f('fk_product_orders_product_id_products')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_product_orders_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('service_requests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('service_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=True),
    sa.Column('request_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['service_id'], ['services.id'], name=op.f('fk_service_requests_service_id_services')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_service_requests_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('wishlist_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.Column('service_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name=op.f('fk_wishlist_items_product_id_products')),
    sa.ForeignKeyConstraint(['service_id'], ['services.id'], name=op.f('fk_wishlist_items_service_id_services')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_wishlist_items_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cart_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('cart_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('service_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['cart_id'], ['carts.id'], name=op.f('fk_cart_items_cart_id_carts')),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name=op.f('fk_cart_items_product_id_products')),
    sa.ForeignKeyConstraint(['service_id'], ['services.id'], name=op.f('fk_cart_items_service_id_services')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order_products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('order_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], name=op.f('fk_order_products_order_id_orders')),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name=op.f('fk_order_products_product_id_products')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order_services',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('order_id', sa.Integer(), nullable=False),
    sa.Column('service_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], name=op.f('fk_order_services_order_id_orders')),
    sa.ForeignKeyConstraint(['service_id'], ['services.id'], name=op.f('fk_order_services_service_id_services')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('order_services')
    op.drop_table('order_products')
    op.drop_table('cart_items')
    op.drop_table('wishlist_items')
    op.drop_table('service_requests')
    op.drop_table('product_orders')
    op.drop_table('orders')
    op.drop_table('carts')
    op.drop_table('users')
    op.drop_table('services')
    op.drop_table('products')
    # ### end Alembic commands ###